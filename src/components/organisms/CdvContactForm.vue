<script lang="ts" setup>
import { localize } from "@vee-validate/i18n";
import CdvBtn from "../molecules/CdvBtn.vue";
import CdvTextInput from "../molecules/CdvTextInput.vue";

localize({
  pt: {
    names: {
      name: "nome",
      email: "email",
      phone: "telefone",
      company: "empresa",
      message: "mensagem",
    },
  },
});
</script>

<template>
  <div class="cdv-contact-form">
    <div class="cdv-contact-form-row">
      <CdvTextInput
        name="name"
        label="Your name"
        required
        rules="required|alpha_spaces|min:2|max:255"
      ></CdvTextInput>

      <CdvTextInput
        name="email"
        label="Email address"
        required
        rules="required|email"
      ></CdvTextInput>
    </div>

    <div class="cdv-contact-form-row">
      <CdvTextInput
        name="phone"
        label="Phone"
        required
        rules="required|numeric"
      ></CdvTextInput>

      <CdvTextInput name="company" label="Company"></CdvTextInput>
    </div>

    <div class="cdv-contact-form-row">
      <CdvTextInput
        name="message"
        label="Message"
        required
        multiline
        rules="required|max:10000"
      ></CdvTextInput>
    </div>

    <div class="flex justify-end">
      <CdvBtn type="submit" rounded arrow>Send message</CdvBtn>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.cdv-contact-form {
  display: flex;
  flex-direction: column;
  gap: 32px;

  &-row {
    display: flex;
    align-items: flex-start;
    gap: 32px;
    width: 100%;

    > .cdv-input {
      flex: 1 1 auto;
    }

    @media screen and (max-width: 980px) {
      flex-direction: column;

      > .cdv-input {
        width: 100%;
      }
    }
  }
}
</style>
