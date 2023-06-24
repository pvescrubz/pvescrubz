toastr.options = {
    "closeButton": true,
    "debug": false,
    "newestOnTop": false,
    "progressBar": false,
    "positionClass": "toast-top-center",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "7000",
    "timeOut": "5000",
    "extendedTimeOut": "7000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
}


const TOKEN = `5836069473:AAHyywZBwjI3qApN8voMdb0LAmr457mugD4`;
const CHAT_ID = `-1001709458101`;
const URI_API = `https://api.telegram.org/bot${TOKEN}/sendMessage`;



const forms = document.querySelectorAll('.form-send');

const phoneInput = document.querySelectorAll('input[type=tel]');
const masksOptions = {
    phone: {
        mask: '+{0} (000) 000-00-00',
        lazy: false,
        placeholderChar: '_'
    }
};

for (const item of phoneInput) {
    new IMask(item, masksOptions.phone);
}

forms.forEach(form => {
    form.addEventListener('submit', function(el) {
        el.preventDefault();


        const allInput = form.querySelectorAll('.form__input');
        allInput.forEach(input => {
            if (!isLineValid(input.value)) {
                input.classList.add('invalid-input')
            }
        });

        if (!this.privPolicy.checked) {
            toastr["error"]("Вы не приняли условия Политики Конфеденциальности и Публичной Оферты")
            return;
        };

        if (this.email) {
            if (isPhoneValid(this.tel.value) && isPhoneValid(this.tel.value) && isNameValid(this.name.value)) {
                tgSend();
                formSubmit();
            }
        } else {
            if (isPhoneValid(this.tel.value) && isNameValid(this.name.value)) {
                tgSend();
                formSubmit();
            }
        }


        function tgSend() {
            let radio = form.querySelectorAll('.connection_type');
            let connectionTypeValue;
            radio.forEach(el => {
                if (el.checked) {
                    connectionTypeValue = el.parentNode.textContent.trim();
                };
            });

            let languageAtr = document.documentElement.lang;

            let message = `<b>Заявка с сайта testimsvladom.site</b>\n`;
            message += `<b>Имя:</b> ${form.name.value}\n`;
            message += `<b>Телефон:</b> ${form.tel.value}\n`;
            if (form.email) {
                message += `<b>Email:</b> ${form.email.value}\n`;
            }
            message += `<b>Способ связи:</b> ${connectionTypeValue}\n`;
            message += `<b>Языковая версия сайта:</b> ${languageAtr}`;
            toastr["success"]("Сообщение отправлено!");


            axios.post(URI_API, {
                chat_id: CHAT_ID,
                parse_mode: 'html',
                text: message
            })


            .then((res) => {
                form.name.value = '',
                    form.tel.value = '',
                    form.privPolicy.checked = false;
                if (form.email) {
                    form.email.value = ''
                }
            });
        }

        //  Send mail

        async function formSubmit() {
            const data = serializeForm(form);
            const response = await sendData(data);
            if (response.ok) {
                let result = await response.json();
            }
        }

        function serializeForm(formNode) {
            return new FormData(form);
        }

        async function sendData(data) {
            let emailForm = `send_mail_ru.php`

            return await fetch(emailForm, {
                method: "POST",
                body: data,
            });
        }

    });
});



// validation

function isEmailValid(value) {
    const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
    return EMAIL_REGEXP.test(value);
};

function isPhoneValid(value) {
    const PHONE_REGEXP = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){11}(\s*)?$/;
    return PHONE_REGEXP.test(value);
};

function isNameValid(value) {
    const NAME_REGEXP = /^[а-яА-Яa-zA-Z]{2,}$/;
    return NAME_REGEXP.test(value);
};

function isLineValid(value) {
    const NAME_REGEXP = /[а-яА-Яa-zA-Z0-9]/;
    return NAME_REGEXP.test(value);
};

function validate() {
    forms.forEach(element => {

        let inputEmail = element.querySelector('.email');
        let lableEmail = element.querySelector('.email-lable');

        if (inputEmail) {
            function onInputEmail() {
                if (isEmailValid(inputEmail.value)) {
                    inputEmail.classList.remove('invalid-input');
                    inputEmail.classList.add('valid-input');
                    lableEmail.classList.remove('invalid-lable');
                    lableEmail.classList.add('valid-lable');
                } else {
                    inputEmail.classList.remove('valid-input');
                    inputEmail.classList.add('invalid-input');
                    lableEmail.classList.remove('valid-lable');
                    lableEmail.classList.add('invalid-lable');
                }
            };
            inputEmail.addEventListener('input', onInputEmail);
        }

        let inputPhone = element.querySelector('.phone');

        function validatePhone() {
            inputPhone.value = inputPhone.value.substr(0, 18);
            if (isPhoneValid(inputPhone.value)) {
                inputPhone.classList.remove('invalid-input');
                inputPhone.classList.add('valid-input');
            } else {
                inputPhone.classList.remove('valid-input');
                inputPhone.classList.add('invalid-input');
            }
        };

        inputPhone.addEventListener('input', validatePhone);


        let inputName = element.querySelector('.name');

        function validateName() {
            if (isNameValid(inputName.value)) {
                inputName.classList.remove('invalid-input');
                inputName.classList.add('valid-input');
            } else {
                inputName.classList.remove('valid-input');
                inputName.classList.add('invalid-input');
            }
        };

        inputName.addEventListener('input', validateName);
    });
};

validate();