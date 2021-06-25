const zips = [];
const fips = [];

const getFip = (zip) => {
    return fips[ zips.indexOf(zip) ]
}