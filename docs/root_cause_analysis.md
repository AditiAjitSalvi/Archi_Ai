# Root Cause Analysis: CORS Error

## Symptom
The frontend application reports a CORS error:
`Access to XMLHttpRequest at 'http://127.0.0.1:9900/chat' from origin 'http://localhost:5173' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.`

## Investigation
1. **Code Review**: The `Server/back.py` file *does* contain the correct `CORSMiddleware` configuration:
   ```python
   app.add_middleware(
       CORSMiddleware,
       allow_origins=["*"],
       ...
   )
   ```
   This suggests the code itself is correct.

2. **Process Analysis**:
   - Terminal logs showed multiple instances of `back.py` being attempted.
   - Specifically, `[WinError 10048] Only one usage of each socket address...` errors were observed in the logs.
   - This indicates that a **previous instance** of the server was still running and hogging the port (9900 or 9990).

3. **Timeline**:
   - An older version of `back.py` (without CORS or with partial config) was started ~1 hour ago.
   - Subsequent attempts to start the *updated* `back.py` (with correct CORS) failed to bind to the port because the old server was still running.
   - The frontend was communicating with the **stale, old server process** which did not have the CORS headers configured.

## Conclusion
The CORS error was caused by a **zombie Python process** running an outdated version of the backend code. The improved code could not start effectively, leaving the frontend to talk to the legacy instance.

## Resolution
1. Terminate all running `python.exe` processes to kill the stale server.
2. Restart the backend using the latest `back.py` code.
