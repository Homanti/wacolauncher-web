function open_tab(html_name, info_message_title = null, info_message_text = null) {
    window.pywebview.api.load_tab(html_name, info_message_title, info_message_text);
}

function show_info_modal(title, message) {
    document.getElementById('info_modal_label').innerText = title;
    document.getElementById('info_modal_text').innerText = message;
    var info_modal = new bootstrap.Modal(document.getElementById('info_modal'));
    info_modal.show();
}

document.addEventListener('click', function (event) {
    if (event.target.tagName === 'A' && event.target.href) {
        event.preventDefault();
        window.pywebview.api.open_link(event.target.href);
    }
});