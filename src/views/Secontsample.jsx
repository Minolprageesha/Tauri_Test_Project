// component example
import { Text } from '@mantine/core';
import { useTranslation } from 'react-i18next';

import { APP_NAME, useMinWidth, useTauriContext } from '../tauri/TauriProvider';
import { createStorage } from '../tauri/storage';



export default function SecondView() {
    const { t } = useTranslation();
    const { fileSep, documents, downloads } = useTauriContext();
    // store-plugin will create necessary directories
    const storeName = `${documents}${APP_NAME}${fileSep}example_view.dat`;
    // const storeName = 'data.dat';
    const { use: useKVP, loading, data } = createStorage(storeName);
    const [exampleData, setExampleData] = useKVP('exampleKey', '');

    useMinWidth(1000);

    // <> is an alias for <React.Fragment>
    return !loading && <>
        <Text>{t('Sample Page 2')}</Text>
    
    </>
}
