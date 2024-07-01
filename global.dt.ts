export type forms = {
  forms: {
    create: (options: {
      region: string
      portalId: string
      formId: string
      target: string
      onFormReady?: () => void
      onBeforeFormInit?: (form: { id: string }) => void
    }) => void
  }
}
declare global {
  interface Window {
    hbspt: forms
  }
}
