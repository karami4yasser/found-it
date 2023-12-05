import { NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';

export type FormControlElement = HTMLInputElement | HTMLTextAreaElement;
export type FormChangeEvent = NativeSyntheticEvent<TextInputChangeEventData>;