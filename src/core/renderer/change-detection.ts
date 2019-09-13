export function setPropertyDescriptor(obj, prop, callback) {
  const actualDescriptor = Object.getOwnPropertyDescriptor(obj, prop);
  if (actualDescriptor && actualDescriptor.get) {
    return actualDescriptor;
  }

  let value = obj[prop];
  const descriptor = {
    get() {
      console.log('getting prop value => ', Date.now());
      return value;
    },
    set(newValue) {
      console.log('setting prop value => ', Date.now());
      value = newValue;
      console.log('<!--- value changed!! ---!>');
      console.log('<!--- Rendering... ---!>');
      callback();
    },
  };
  Object.defineProperty(obj, prop, descriptor);
}
