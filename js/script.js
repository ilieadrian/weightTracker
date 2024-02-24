function handleValidData(date, weight, comment) {
    // Your logic for handling valid data goes here
    console.log('Handling valid data:', date, weight, comment);
    return {
        date, weight, comment
    }
}


const FormModule = (function () {
    function handleSubmit(e) {
        e.preventDefault();

        const formElementsIDs = ['date-timepicker', 'weight'];
        let isError = false;

        formElementsIDs.forEach(elementId => {
            const inputElement = document.getElementById(elementId);
            const errorTxtElement = document.getElementById(`${elementId}-form-error`);
            const value = inputElement.value.trim();

            if (value.length === 0) {
                inputElement.classList.add("error");
                errorTxtElement.classList.add("error");
                isError = true;
            } else {
                inputElement.classList.remove("error");
                errorTxtElement.classList.remove("error");
            }
        });

        if (!isError) {
            const date = document.getElementById('date-timepicker').value;
            const weight = +document.getElementById('weight').value;
            const comment = document.getElementById('comment').value.trim();

            handleValidData(date, weight, comment);
        } else {
            console.log('Form validation failed. Cannot proceed.');
            return null;
        }
    }

    function initializeForm() {
        const submitBtn = document.getElementById('submit-btn');
        submitBtn.addEventListener('click', handleSubmit);
    }

    return { initializeForm };
})();

FormModule.initializeForm();




