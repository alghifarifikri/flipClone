/* eslint-disable prettier/prettier */
export async function FetchApi(url) {
    let getData = await fetch(url)
        .then((response) => response.json())
        .then(async (res) => {
            var result = [];
            for (var key in res) {
                result.push(res[key]);
            }
            result.filter((e) => {
              let name = e.beneficiary_name.toLowerCase();
              return (e.beneficiary_name = name);
            });
            return {success: true, result};
        })
        .catch((error) => {
            return {success: false, error};
        });
        return getData;
  }
