const getBQAttributeRegex = bqAttr => {
  return new RegExp('(' + bqAttr + ')=[\'"]+((?:(?!/>|>|"|\'|s).)+)');
};

export function getAttributesOfNode(node) {
  const attrKeys = node.getAttributeNames();
  const argsForNode: object = {};

  attrKeys.forEach(key => {
    Object.assign(argsForNode, { [key]: node.getAttribute(key) });
  });

  return argsForNode;
}

export function getTemplateBinding(template, argMap) {
  let t = template;
  Object.keys(argMap).forEach(key => {
    t = mapPropertiesToTemplate(t, argMap, key);
  });

  t = t.replace(new RegExp('{[a-zA-Z]+}'), '');

  return t;
}

export function bindEventListener(node, template, classReference) {
  const funcToMap = getFunctionsFromTemplate(template)
    .replace('(', '')
    .replace(')', '');
  const proptotye = Object.getPrototypeOf(classReference);

  if (proptotye.hasOwnProperty(funcToMap)) {
    node.addEventListener('click', Object.getPrototypeOf(classReference)[funcToMap].bind(classReference));
  }
}

function mapPropertiesToTemplate(template, map, key) {
  const regex = new RegExp('{' + key + '}', 'gm');
  const matches = template.match(regex);
  if (matches) {
    const keyMatch = matches[0].replace('{', '').replace('}', '');

    if (key === keyMatch) {
      template = template.replace(regex, map[key]);
    }
  }
  return template;
}

function getFunctionsFromTemplate(template) {
  let func = '';
  const matches = template.match(getBQAttributeRegex('bq-click'));
  if (matches && matches[2]) {
    func = matches[2];
  }
  return func;
}
