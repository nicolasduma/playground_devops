document.getElementById('cpf').addEventListener('input', function () {
  let v = this.value.replace(/\D/g, '').slice(0, 11);
  if (v.length > 9) v = v.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/, '$1.$2.$3-$4');
  else if (v.length > 6) v = v.replace(/(\d{3})(\d{3})(\d{1,3})/, '$1.$2.$3');
  else if (v.length > 3) v = v.replace(/(\d{3})(\d{1,3})/, '$1.$2');
  this.value = v;
});

function validarCPF(cpf) {
  cpf = cpf.replace(/\D/g, '');
  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;
  let s = 0;
  for (let i = 0; i < 9; i++) s += +cpf[i] * (10 - i);
  let r = (s * 10) % 11; if (r === 10 || r === 11) r = 0;
  if (r !== +cpf[9]) return false;
  s = 0;
  for (let i = 0; i < 10; i++) s += +cpf[i] * (11 - i);
  r = (s * 10) % 11; if (r === 10 || r === 11) r = 0;
  return r === +cpf[10];
  }

function setError(id, errId, show) {
  const input = document.getElementById(id);
  const msg   = document.getElementById(errId);
  input.classList.toggle('invalid', show);
  msg.classList.toggle('visible', show);
  }

function showToast(msg, type) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.className = 'toast ' + type;
  }

function handleSubmit() {
  const nome  = document.getElementById('nome').value.trim();
  const cpf   = document.getElementById('cpf').value.trim();
  const email = document.getElementById('email').value.trim();

  const nomeOk  = nome.length >= 3;
  const cpfOk   = validarCPF(cpf);
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  setError('nome',  'nome-error',  !nomeOk);
  setError('cpf',   'cpf-error',   !cpfOk);
  setError('email', 'email-error', !emailOk);

  if (nomeOk && cpfOk && emailOk) {
    showToast('✓ Cliente cadastrado com sucesso!', 'success');
    document.getElementById('nome').value  = '';
    document.getElementById('cpf').value   = '';
    document.getElementById('email').value = '';
  } else {
    showToast('Corrija os campos destacados antes de continuar.', 'error');
  }
}