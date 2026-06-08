export function getUncontrolledFormValues(formData: FormData) {
  const name = formData.get('name');
  const age = formData.get('age');
  const email = formData.get('email');
  const gender = formData.get('gender');
  const terms = formData.get('terms');
  const password = formData.get('password');
  const confirmPassword = formData.get('confirmPassword');
  const country = formData.get('country');

  return {
    name: typeof name === 'string' ? name : '',
    age: typeof age === 'string' ? age : '',
    email: typeof email === 'string' ? email : '',
    gender: typeof gender === 'string' ? gender : '',
    terms: terms === 'on',
    password: typeof password === 'string' ? password : '',
    confirmPassword: typeof confirmPassword === 'string' ? confirmPassword : '',
    country: typeof country === 'string' ? country : '',
  };
}
