export async function formAction(formData: FormData) {
  'use server'
  const rawFormData = {
    name: formData.get('name'),
    email: formData.get('email'),
    value: formData.get('value'),
    descripton: formData.get('description')
  }

  console.log('formData', rawFormData)
}
