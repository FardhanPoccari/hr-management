import { createFormHook } from '@tanstack/react-form'

import {
  SubscribeButton,
  Switch,
  TextArea,
  TextField,
} from '../components/FormComponents'
import { fieldContext, formContext } from './demoFormContext'

export const { useAppForm } = createFormHook({
  fieldComponents: {
    TextField,
    TextArea,
    Switch,
  },
  formComponents: {
    SubscribeButton,
  },
  fieldContext,
  formContext,
})
