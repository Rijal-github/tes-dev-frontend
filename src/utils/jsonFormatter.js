export const formatJsonData = (caseJson) => {
    const sourceData = caseJson.data;

    const grandTotal = sourceData.reduce(
        (sum, item) => sum + item.total, 0
    );

    const groupByCategory = sourceData.reduce((acc, item) => {
        const {category, code, name, total} = item;

        //init category
        if (!acc[category]) {
            acc[category] = {
                category,
                total: 0,
                data: {}
            };
        }

        //init code
        if (!acc[category].data[code]) {
            acc[category].data[code] = {
                total: 0,
                data: []
            };
        }

        //push item
        acc[category].data[code].data.push({name, total});

        //accumulate total
        acc[category].data[code].total += total;
        acc[category].total += total;

        return acc;
    }, {});

    //convert objek -> array (sesuai expectation)
    return {
        total: grandTotal,
        data: Object.values(groupByCategory)
    };
}