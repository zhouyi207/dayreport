// 简单事件发布订阅总线
type Callback = () => void;

const unauthorizedListeners: Callback[] = [];
const forbiddenListeners: Callback[] = [];

export function onUnauthorized(cb: Callback) {
  unauthorizedListeners.push(cb);
}

export function onForbidden(cb: Callback) {
  forbiddenListeners.push(cb);
}

export function triggerUnauthorized() {
  unauthorizedListeners.forEach(cb => cb());
}

export function triggerForbidden() {
  forbiddenListeners.forEach(cb => cb());
}
