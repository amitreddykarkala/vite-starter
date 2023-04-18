// src/setupTests.js
import "./index.css";
import "@testing-library/jest-dom";

import { server } from "./mocks/server.js";
// Establish API mocking before all tests.

beforeAll(() => server.listen());
beforeEach(() => {
  console.log("msw stest started");
  localStorage.setItem(
    "AccessToken",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2ODE3MjE5MTcsImlhdCI6MTY4MTYzNTUxNywiaXNzIjoic2Vuc2xhYnMuaW8iLCJzdWIiOiJ7XCJBdXRoSWRcIjpcImRjYTAyMmE0LWEyOGQtNDE5NS1iY2E1LWFlZDcxOTg5ZTBlZVwiLFwiQXV0aFByb3ZpZGVyXCI6XCJTRU5TXCIsXCJBdXRoUm9sZVwiOlwifFNFTlNcIixcIkNhdGVnb3J5XCI6XCJPUEVSQVRPUlwiLFwiQ3JlYXRlZEF0XCI6XCIyMDIyLTA1LTExVDEwOjU5OjIwLjIyMjM5NlwiLFwiRGV2aWNlTWF0Y2hlcnNcIjpcIlwiLFwiRW1haWxcIjpcImFtaXQucmVkZHlAZG96ZWUuaW9cIixcIkZpcnN0TmFtZVwiOlwiQW1pdFwiLFwiTGFzdE5hbWVcIjpcIlJlZGR5XCIsXCJMb2dvXCI6bnVsbCxcIk1vYmlsZVwiOlwiKzkxOTk5MDk0MDkzNlwiLFwiT3BlcmF0b3JJZFwiOlwiNjdhYjI4MTAtYjM3YS00OTc1LTkyZjEtMGExYzQ4MDQ3Y2Q2XCIsXCJPcmdhbml6YXRpb25JZFwiOlwiYTczNmRmY2MtYjE3YS00MDE5LTkyMDUtOGVlYzJjOGNkYWJmXCIsXCJPcmdhbml6YXRpb25NYXRjaGVyc1wiOlwiXCIsXCJPcmdhbml6YXRpb25OYW1lXCI6XCJBdXRvbWF0aW9uIFFBXCIsXCJSb2xlXCI6XCJPUEVSQVRPUlwiLFwiVG9rZW5UeXBlXCI6XCJBY2Nlc3NUb2tlblwiLFwiVW5pcXVlTmFtZVwiOm51bGwsXCJVbmlxdWVWYWx1ZVwiOm51bGwsXCJWaXNpYmxlV2FyZHNcIjpcIlwifSJ9.oXRSmXBMxRxvdcWW43VhXCRQmdemwAIXnOD0o2NWWMo"
  );
});
// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers());
// Clean up after the tests are finished.
afterAll(() => server.close());
