class ValidationError extends Error{}
class NotFoundError extends Error{}

function handleError(err, req, res, next){
    if(err instanceof  NotFoundError){
        res
            .status(404)
            .render('error',{
            message: 'Nie można znaleźć elementu o danym id',
        });
        return;
    }
    console.error(err);

    res.status(err instanceof ValidationError ? 200 : 400);

    res.render('error',{
        message: err instanceof ValidationError ? err.message : 'Przepraszamy spróbuj ponowanie za jakiś czas',
    })
}

module.exports = {
    handleError,
    ValidationError,
    NotFoundError,
}