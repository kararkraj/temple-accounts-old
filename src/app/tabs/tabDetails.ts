export const TAB_DETAILS: TabDetail[] = [
    {
        tabName: 'add-entry',
        href: '/tabs/add-entry',
        title: 'Add entry',
        iconName: 'add-outline'
    },
    {
        tabName: 'view-entries',
        href: '/tabs/view-entries',
        title: 'View entries',
        iconName: 'list-outline'
    }
]

export interface TabDetail {
    tabName: string;
    href: string;
    title: string;
    iconName: string;
}