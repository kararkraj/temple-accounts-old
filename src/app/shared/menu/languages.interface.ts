export interface Language {
    language: string;
    iconName: string;
    isSelected: boolean;
}

export const LANGUAGES: Language[] = [
    {
        language: 'English',
        iconName: 'checkmark-outline',
        isSelected: true
    },
    {
        language: 'Kannada',
        iconName: 'checkmark-outline',
        isSelected: false
    }
];