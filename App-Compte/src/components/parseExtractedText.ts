const parseExtractedText = (text: string) => {
  const currentYear = new Date().getFullYear().toString();

  let date = '';
  let nomDeLaDepense = '';
  let selectedOption = '';
  let depenseCarteBleue = '';

  const regex = /\d{2}\/\d{2}/g;
  const match = regex.exec(text);

  if (match) {
    const index = match.index;
    const extractedDate = text.substring(index, index + 5);
    const [day, month] = extractedDate.split('/');
    date = `${currentYear}-${month}-${day}`;
    nomDeLaDepense = text.substring(0, index - 1).replace(/X.{5}/, '').replace('(7)', '').replace(/\d{2}\/$/, '').replace(/[^a-zA-Z0-9\s]/g, '');
  }

  const depenseCarteBleueMatch = text.match(/([-+])?\s?\d+,\d{2} €?/);

  if (depenseCarteBleueMatch) {
    let amount = depenseCarteBleueMatch[0].replace(',', '.').replace('€', '').trim();
    amount = amount.replace(/\s/g, '');
    if (amount.startsWith('-')) {
      selectedOption = 'DepenseCarteBleue';
      depenseCarteBleue = amount.replace('-', '');
    } else if (amount.startsWith('+')) {
      selectedOption = 'ObtenuCarteBleue';
      depenseCarteBleue = amount.replace('+', '');
    } else {
      depenseCarteBleue = amount;
      console.log(depenseCarteBleue);
    }
  }

  return {
    Date: date,
    NomDeLaDepense: nomDeLaDepense,
    DepenseCarteBleue: depenseCarteBleue,
    selectedOption: selectedOption
  };
};

export default parseExtractedText;
