const parseIngredients = (ingredientsString) => {
  let ingredients = [];
  const ingredientLines = ingredientsString.split('\n');
  ingredients = ingredientLines.map((line) => {
    let copy = line;
    const parsedIngredient = {
      amount: '',
      unit: '',
      ingredient: '',
    };
    const amountRegex = new RegExp(/(\d)+(\s?\d)*(\d|\.|\/)*/);
    const match = copy.match(amountRegex);
    if (match) {
      const amount = match[0];
      parsedIngredient.amount = amount;
      const lineWithoutAmount = copy.replace(amountRegex, '');
      copy = lineWithoutAmount.trim();
    }

    const units = [
      'EL', 'TL', 'CUPS', 'CUP', 'G', 'ML',
    ];

    const regexBuilder = (string) => `((\\W|^)${string}(?=\\W))`;
    const test = units.reduce((string, unit) => string.concat(`|${regexBuilder(unit)}`),
      (regexBuilder(units[0])));
    const unitRegex = new RegExp(test, 'i');
    const unitMatch = copy.match(unitRegex);
    if (unitMatch) {
      const unit = unitMatch[0];
      parsedIngredient.unit = unit.trim();
      const lineWithoutUnit = copy.replace(unit, '');
      copy = lineWithoutUnit.trim();
    }
    parsedIngredient.ingredient = copy;
    return parsedIngredient;
  });

  return ingredients;
};

export default parseIngredients;
