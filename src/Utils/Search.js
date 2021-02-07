/* eslint-disable prettier/prettier */
export function Search(text, dataFil) {
  const newData = dataFil.filter((item) => {
    const itemName = `${item.beneficiary_name}`;
    const bank1 = `${item.beneficiary_bank}`;
    const bank2 = `${item.sender_bank}`;
    const nominal = `${item.amount}`;
    const textData = text.toLowerCase();
    if (itemName.indexOf(textData) > -1) {
      return itemName.indexOf(textData) > -1;
    } else if (bank1.indexOf(textData) > -1) {
      return bank1.indexOf(textData) > -1;
    } else if (bank2.indexOf(textData) > -1) {
      return bank2.indexOf(textData) > -1;
    } else {
      return nominal.indexOf(textData) > -1;
    }
  });
  return newData;
}
