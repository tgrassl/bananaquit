export function setPropertyDescriptor(obj, prop, callback) {
  const actualDescriptor = Object.getOwnPropertyDescriptor(obj, prop);
  if (actualDescriptor && actualDescriptor.get) {
    return actualDescriptor;
  }

  let value = obj[prop];
  const descriptor = {
    get() {
      return value;
    },
    set(newValue) {
      value = newValue;
      callback();
    },
  };
  Object.defineProperty(obj, prop, descriptor);
}
