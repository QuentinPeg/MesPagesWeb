const parseExtractedText = (text: string) => {
  const currentYear = new Date().getFullYear().toString(); // Derniers deux chiffres de l'année

  let date = '';
  let nomDeLaDepense = '';
  let selectedOption = '';

  const regex = /\d{2}\/\d{2}/g;
  const match = regex.exec(text);

  if (match) {
    const index = match.index;
    const extractedDate = text.substring(index, index + 5); // Extrait la date au format dd/mm
    const [day, month] = extractedDate.split('/');
    date = `${currentYear}-${month}-${day}`; // Reformate la date en jj/mm/aa
    nomDeLaDepense = text.substring(0, index - 1).replace('X5556 ', '').replace('(7)', '').replace(/\d{2}\/$/, '');
  } else {
  }

  const depenseCarteBleueMatch = text.match(/([-+])?\s?\d+,\d{2} €?/);
  let depenseCarteBleue = '';

  if (depenseCarteBleueMatch) {
    let amount = depenseCarteBleueMatch[0].replace(',', '.').replace('€', '').trim(); // Utilisez let pour pouvoir le modifier
    amount = amount.trim(); // Supprime les espaces
    if (amount.startsWith('-')) {
      selectedOption = 'Dépense Carte Bleue';
      depenseCarteBleue = amount.replace('-', '');
    } else if (amount.startsWith('+')) {
      selectedOption = 'Obtenu Carte Bleue';
      depenseCarteBleue = amount.replace('+', '');
    } else {
      depenseCarteBleue = amount;
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
