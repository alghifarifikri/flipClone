/* eslint-disable prettier/prettier */
export function ParsedDate(strDate) {
  let strSplitDate = String(strDate).split(' ');
  let date = new Date(strSplitDate[0]);
  let dd = date.getDate();
  let mm = date.getMonth() + 1;

  let yyyy = date.getFullYear();
  date = dd + ' ' + listMonth(mm) + ' ' + yyyy;
  return date.toString();
}

function listMonth(month) {
    switch (month) {
        case 1: return 'Januari';
        case 2: return 'Februari';
        case 3: return 'Maret';
        case 4: return 'April';
        case 5: return 'Mei';
        case 6: return 'Juni';
        case 7: return 'Juli';
        case 8: return 'Agustus';
        case 9: return 'September';
        case 10: return 'Oktober';
        case 11: return 'November';
        case 12: return 'Desember';
        default: break;
    }
}
