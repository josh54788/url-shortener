import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand, GetCommand, UpdateCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";
import crypto from "crypto";

const client = new DynamoDBClient({});
const dynamo = DynamoDBDocumentClient.from(client);
const tableName = "UrlShortenerTable";

export const handler = async (event) => {
    // Check if this is a request from an API Gateway
    const httpMethod = event.requestContext?.http?.method || event.httpMethod;
    const path = event.requestContext?.http?.path || event.path;

    // CORS Headers to allow your local frontend to talk to AWS
    const headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
    };

    if (httpMethod === 'OPTIONS') {
        return { statusCode: 200, headers, body: '' };
    }

    try {
        // 1. POST Request: Create a new short link
        if (httpMethod === 'POST') {
            const body = JSON.parse(event.body);
            const originalUrl = body.original_url;
            const shortCode = crypto.randomBytes(3).toString('hex');

            await dynamo.send(new PutCommand({
                TableName: tableName,
                Item: {
                    short_code: shortCode,
                    original_url: originalUrl,
                    clicks: 0,
                    created_at: new Date().toISOString()
                }
            }));

            // Make sure to replace this domain with your API Gateway domain later
            const apiDomain = `https://${event.requestContext.domainName}`;
            
            return {
                statusCode: 200,
                headers,
                body: JSON.stringify({
                    short_code: shortCode,
                    short_url: `${apiDomain}/${shortCode}`
                })
            };
        }

        // 2. GET Request: Fetch all analytics data for the dashboard
        if (httpMethod === 'GET' && (path === '/analytics' || path.endsWith('/analytics'))) {
            const response = await dynamo.send(new ScanCommand({
                TableName: tableName
            }));

            // Sort by newest first
            const sortedItems = (response.Items || []).sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

            return {
                statusCode: 200,
                headers,
                body: JSON.stringify(sortedItems)
            };
        }

        // 3. GET Request: Redirect a user when they click a short link
        if (httpMethod === 'GET') {
            // Extract the short code from the URL path (e.g., /abc123)
            const pathParts = path.split('/').filter(Boolean);
            const shortCode = pathParts[pathParts.length - 1];

            if (!shortCode) return { statusCode: 400, headers, body: 'Invalid URL' };

            const response = await dynamo.send(new GetCommand({
                TableName: tableName,
                Key: { short_code: shortCode }
            }));

            if (response.Item) {
                // Increment the click counter
                await dynamo.send(new UpdateCommand({
                    TableName: tableName,
                    Key: { short_code: shortCode },
                    UpdateExpression: "set clicks = clicks + :val",
                    ExpressionAttributeValues: { ":val": 1 }
                }));

                // Redirect the browser to the original URL
                return {
                    statusCode: 301,
                    headers: {
                        ...headers,
                        Location: response.Item.original_url
                    }
                };
            }

            return { statusCode: 404, headers, body: 'URL Not Found' };
        }
    } catch (error) {
        console.error(error);
        return { statusCode: 500, headers, body: JSON.stringify({ error: "Internal Server Error" }) };
    }
};