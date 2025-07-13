export function setCookie(userUid) {
  const d = new Date();
  d.setTime(d.getTime() + (24 * 60 * 60 * 1000)); // 1 day
  const expires = "expires=" + d.toUTCString();
  document.cookie = `Uid=${userUid}; ${expires}; path=/`;
}


export function getUidCookie() {
  const name = "Uid=";
  const decoded = decodeURIComponent(document.cookie);
  const cookies = decoded.split(';');
  for (let c of cookies) {
    c = c.trim();
    if (c.indexOf(name) === 0) {
      return c.substring(name.length);
    }
  }
  return null;
}

export function deleteUidCookie() {
  document.cookie = "Uid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}