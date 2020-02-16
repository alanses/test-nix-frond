export const ValidationService = {
    getListErrors(errors) {
        let listMessages = '<div>';

        for (let errorName in errors) {
            listMessages += errors[errorName].map((error) => {
                return '<p>' + error + '</p>';
            });
        }

        listMessages += '</div>';

        return listMessages;
    }
};