import requests
import time
import random
import string

# --- CONFIGURATION ---
BASE_URL = "https://tinylink-mocha.vercel.app"
# Generate a random code to ensure we don't clash with previous runs
RANDOM_CODE = ''.join(random.choices(string.ascii_letters + string.digits, k=6))
LONG_URL = "https://www.example.com/documentation/very/long/path/to/test/redirection"

# Colors for terminal output
GREEN = '\033[92m'
RED = '\033[91m'
RESET = '\033[0m'

def log(message, passed=True):
    if passed:
        print(f"[{GREEN}PASS{RESET}] {message}")
    else:
        print(f"[{RED}FAIL{RESET}] {message}")

def test_healthz():
    """Test 1: Health Endpoint Compliance [cite: 66, 74]"""
    print(f"\n--- Testing /healthz ---")
    try:
        res = requests.get(f"{BASE_URL}/healthz")
        if res.status_code == 200 and res.json().get('ok') is True:
            log("Healthz returns 200 and ok:true")
        else:
            log(f"Healthz failed. Status: {res.status_code}, Body: {res.text}", False)
    except Exception as e:
        log(f"Healthz Exception: {e}", False)

def test_create_and_regex():
    """Test 2 & 8: Creation & Regex Validation [cite: 72]"""
    print(f"\n--- Testing Creation & Regex [A-Za-z0-9]{{6,8}} ---")
    
    # 1. Valid Create
    payload = {"url": LONG_URL, "shortCode": RANDOM_CODE}
    res = requests.post(f"{BASE_URL}/api/links", json=payload)
    if res.status_code == 201 or res.status_code == 200:
        log(f"Created valid link with code: {RANDOM_CODE}")
    else:
        log(f"Failed to create valid link. Status: {res.status_code}", False)

    # 2. Invalid Regex (Too short - 3 chars)
    bad_payload = {"url": LONG_URL, "shortCode": "abc"} 
    res = requests.post(f"{BASE_URL}/api/links", json=bad_payload)
    if res.status_code == 400 or res.status_code == 422:
        log("Correctly rejected code 'abc' (too short)")
    else:
        log(f"FAILED: Accepted invalid code 'abc'. Status: {res.status_code}", False)

    # 3. Invalid Regex (Special chars)
    bad_payload_2 = {"url": LONG_URL, "shortCode": "ab-cd!"}
    res = requests.post(f"{BASE_URL}/api/links", json=bad_payload_2)
    if res.status_code == 400 or res.status_code == 422:
        log("Correctly rejected code 'ab-cd!' (special chars)")
    else:
        log(f"FAILED: Accepted invalid code 'ab-cd!'. Status: {res.status_code}", False)

def test_duplicate_409():
    """Test 3: Duplicate Code 409 [cite: 70, 75]"""
    print(f"\n--- Testing Duplicate Handling ---")
    payload = {"url": "https://google.com", "shortCode": RANDOM_CODE} # Using same code as above
    res = requests.post(f"{BASE_URL}/api/links", json=payload)
    
    if res.status_code == 409:
        log(f"Correctly returned 409 for duplicate code: {RANDOM_CODE}")
    else:
        log(f"FAILED: Did not return 409 for duplicate. Status: {res.status_code}", False)

def test_redirection_and_stats():
    """Test 5 & 7: Redirection 302 & Stats Increment [cite: 25, 26, 64]"""
    print(f"\n--- Testing Redirection & Stats ---")
    
    # 1. Check Stats BEFORE click
    stats_res = requests.get(f"{BASE_URL}/api/links/{RANDOM_CODE}")
    initial_clicks = stats_res.json().get('clicks', 0)
    
    # 2. Perform Redirect (allow_redirects=False to catch the 302)
    # Note: Spec demands 302. 301 is a fail.
    redirect_res = requests.get(f"{BASE_URL}/{RANDOM_CODE}", allow_redirects=False)
    
    if redirect_res.status_code == 302:
        log("Redirect returns 302 Found")
    elif redirect_res.status_code == 301:
        log("WARNING: Redirect returned 301 (Permanent). Spec requests 302.", False)
    else:
        log(f"FAILED: Redirect status was {redirect_res.status_code}", False)

    # 3. Check Stats AFTER click (Allow slight delay for DB update)
    time.sleep(1)
    stats_res_after = requests.get(f"{BASE_URL}/api/links/{RANDOM_CODE}")
    new_clicks = stats_res_after.json().get('clicks', 0)
    
    if new_clicks > initial_clicks:
        log(f"Click count incremented: {initial_clicks} -> {new_clicks}")
    else:
        log(f"FAILED: Click count did not increment.", False)

def test_delete_logic():
    """Test 6 & 10: Deletion and 404 [cite: 29, 77]"""
    print(f"\n--- Testing Deletion Logic ---")
    
    # 1. Delete the link
    del_res = requests.delete(f"{BASE_URL}/api/links/{RANDOM_CODE}")
    if del_res.status_code in [200, 204]:
        log(f"Delete request successful for {RANDOM_CODE}")
    else:
        log(f"Delete request failed. Status: {del_res.status_code}", False)
        
    # 2. Verify 404 on Redirect
    check_res = requests.get(f"{BASE_URL}/{RANDOM_CODE}", allow_redirects=False)
    if check_res.status_code == 404:
        log("Visiting deleted link correctly returns 404")
    else:
        log(f"FAILED: Visiting deleted link returned {check_res.status_code}", False)

def run_suite():
    print(f"TARGET: {BASE_URL}")
    print("Starting Destructive Test Suite...\n")
    
    try:
        test_healthz()
        test_create_and_regex()
        test_duplicate_409()
        test_redirection_and_stats()
        test_delete_logic()
    except requests.exceptions.ConnectionError:
        print(f"\n{RED}CRITICAL ERROR: Could not connect to {BASE_URL}. Is the server running?{RESET}")

if __name__ == "__main__":
    run_suite()