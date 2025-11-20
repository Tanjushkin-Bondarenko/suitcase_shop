export function checkValidityEmail(){
  const form = document.querySelector('#form-contact')
  form.addEventListener('submit', function (e) {
    e.preventDefault()
    document.querySelector("#success-message").style.display = " block";
    form.reset()
  })
}
