
module.exports = async function execute(event, context, logger) {

    const query = "SELECT Id, Name FROM Account";

    const results = await context.org.dataApi.query(query);

    logger.info(JSON.stringify(results));

    return results;

};	