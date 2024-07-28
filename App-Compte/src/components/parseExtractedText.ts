const parseExtractedText = (text: string) => {
  const currentYear = new Date().getFullYear().toString();

  let date = '';
  let nomDeLaDepense = '';
  let selectedOption = '';
  let depenseCarteBleue = '';

  console.log("Input text:", text);

  // Extract date in dd/mm format
  const regex = /\d{2}\/\d{2}/g;
  const match = regex.exec(text);

  if (match) {
    const index = match.index;
    const extractedDate = text.substring(index, index + 5);
    const [day, month] = extractedDate.split('/');
    date = `${currentYear}-${month}-${day}`;

    // Remove 'X' followed by exactly four characters
    nomDeLaDepense = text.substring(0, index - 1)
      .replace(/X.{4}/, '')
      .replace('(7)', '')
      .replace(/\d{2}\/$/, '')
      .replace(/[^a-zA-Z0-9\s]/g, '');

    console.log("Extracted date:", date);
    console.log("Extracted name:", nomDeLaDepense);
  }

  // Update the regex to handle more variations of the amount
  const depenseCarteBleueMatch = text.match(/([-+]?)\s?-?\s?\d+,\d{2}€?/);
  console.log("Amount match:", depenseCarteBleueMatch);

  if (depenseCarteBleueMatch) {
    let amount = depenseCarteBleueMatch[0]
      .replace(',', '.')
      .replace('€', '')
      .replace(/\s+/g, '') // Remove all spaces
      .trim();

    console.log("Formatted amount:", amount);

    if (amount.startsWith('-')) {
      selectedOption = 'DepenseCarteBleue';
      depenseCarteBleue = amount.replace('-', '');
    } else if (amount.startsWith('+')) {
      selectedOption = 'ObtenuCarteBleue';
      depenseCarteBleue = amount.replace('+', '');
    } else {
      depenseCarteBleue = amount;
    }

    console.log("DepenseCarteBleue:", depenseCarteBleue);
    console.log("Selected option:", selectedOption);
  }

  return {
    Date: date,
    NomDeLaDepense: nomDeLaDepense,
    DepenseCarteBleue: depenseCarteBleue,
    selectedOption: selectedOption
  };
};

export default parseExtractedText;
