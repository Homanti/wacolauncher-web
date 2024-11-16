const nickname = document.getElementById('input_register_nickname');
const password = document.getElementById('input_register_password');
const history = document.getElementById('input_register_history');
const how_did_you_find = document.getElementById('input_register_how_did_you_find');
const skin = document.getElementById('input_register_skin');
const rulesCheckbox = document.getElementById('checkbox_register_rules');
const registerButton = document.getElementById('btn_register');

document.addEventListener('DOMContentLoaded', function () {
    function validateForm() {
        const fields = [nickname, password, history, how_did_you_find];
        const isFormValid = fields.every(field => field.value.trim() !== '') &&
                            skin.files.length > 0 &&
                            rulesCheckbox.checked;

        registerButton.disabled = !isFormValid;
    }

    nickname.addEventListener('input', validateForm);
    password.addEventListener('input', validateForm);
    history.addEventListener('input', validateForm);
    how_did_you_find.addEventListener('input', validateForm);
    skin.addEventListener('input', validateForm);
    rulesCheckbox.addEventListener('change', validateForm);

    validateForm();
});

async function register_account() {
    const NicknameisValid = /^[A-Za-z0-9-_]+$/.test(nickname.value);
    const PasswordisValid = /^[A-Za-z0-9-_]+$/.test(password.value);

    if (nickname.value.length < 3) {
        show_info_modal("Ошибка", "Никнейм должен содержать как минимум 3 символа.")
    } else if (!NicknameisValid && !PasswordisValid) {
        show_info_modal("Ошибка", "Никнейм или пароль не должен содержать кириллицу, пробелы и специальные знаки.")
    } else if (password.value.length < 6) {
        show_info_modal("Ошибка", "Пароль должен содержать как минимум 6 символов.")
    } else {
        try {
            const skinFile = skin.files[0];

            const reader = new FileReader();
            reader.readAsArrayBuffer(skinFile);
            reader.onloadend = async function () {
                const skinBytes = Array.from(new Uint8Array(reader.result));
                const result = await window.pywebview.api.account_register(
                    nickname.value,
                    password.value,
                    history.value,
                    how_did_you_find.value,
                    skinBytes
                );

                if (result.status_code === 200) {
                    if (result.result[3]) {
                        open_tab("index");
                    } else {
                        open_tab("link_discord_register");
                    }

                } else {
                    if (result.status_code === 409) {
                        show_info_modal("Ошибка", "Аккаунт с таким ником уже существует")
                    } else {
                        show_info_modal("Ошибка", "Произошла непредвиденная ошибка. Попробуйте еще раз.");
                    }
                }
            };

        } catch (error) {
            show_info_modal("Ошибка", "Произошла ошибка при регистрации. Пожалуйста, попробуйте еще раз.");
            console.error(error);
        }
    }
}

registerButton.addEventListener("click", function () {
    register_account();
});