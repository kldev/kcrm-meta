using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace KCrm.Data.Country.Reader {
    public interface ICountryReader {

        Task<string> QueryListAsync(string query);
    }
}
