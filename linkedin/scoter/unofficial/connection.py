from __future__ import annotations

from linkedin_api import Linkedin
from requests.cookies import RequestsCookieJar

from scoter.config import UnofficialConfig


def connect(config: UnofficialConfig) -> Linkedin:
    if config.cookie:
        jar = RequestsCookieJar()
        jar.set("li_at", config.cookie, domain=".linkedin.com", path="/")
        jar.set("JSESSIONID", config.jsessionid, domain=".linkedin.com", path="/")
        return Linkedin("", "", cookies=jar)
    return Linkedin(config.email, config.password)
