// component example
import { Text, Anchor, Space, Button, Title, TextInput } from '@mantine/core';
import { Trans, useTranslation } from 'react-i18next';
import {printers, print, print_file, jobs, job, restart_job, pause_job, resume_job, remove_job} from "tauri-plugin-printer";
import * as fs from '@tauri-apps/api/fs';
import * as shell from '@tauri-apps/api/shell';
import { invoke } from '@tauri-apps/api/tauri'

import { notifications } from '@mantine/notifications';
import { APP_NAME, RUNNING_IN_TAURI, useMinWidth, useTauriContext } from '../tauri/TauriProvider';
import { appWindow } from '@tauri-apps/api/window'
import { createStorage } from '../tauri/storage';
import { notify } from '../common/utils';


function toggleFullscreen() {
    appWindow.isFullscreen().then(x => appWindow.setFullscreen(!x));
}

export default function ExampleView() {
    const { t } = useTranslation();
    const { fileSep, documents, downloads } = useTauriContext();
    // store-plugin will create necessary directories
    const storeName = `${documents}${APP_NAME}${fileSep}example_view.dat`;
    // const storeName = 'data.dat';
    const { use: useKVP, loading, data } = createStorage(storeName);
    const [exampleData, setExampleData] = useKVP('exampleKey', '');
    // get list printers

    useMinWidth(1000);

    async function printViaNative(data) {
        await invoke('send_to_printer', { data: "Hello, Printer!" });
      }

    // fs example
    async function createFile() {
        // run only in desktop/tauri env
        if (RUNNING_IN_TAURI) {
            // https://tauri.app/v1/api/js/modules/fs
            const filePath = `${downloads}/example_file.txt`;
            await fs.writeTextFile('example_file.txt', 'oh this is from TAURI! COOLIO.\n', { dir: fs.BaseDirectory.Download });
            // show in file explorer: https://github.com/tauri-apps/tauri/issues/4062
            await shell.open(downloads);
            await invoke('process_file', { filepath: filePath }).then(msg => {
                console.log(msg === 'Hello from Rust!')
                notify('Message from Rust', msg);
            
            });
        }
    }


    async function connectToPrinter() {
        try {
            const list = await printers();
    
            const data = [
                {
                    type: 'text',
                    value: 'SAMPLE HEADING',
                    style: { fontWeight: "700", textAlign: 'center', fontSize: "24px" }
                },
                {
                    type: 'text',
                    value: 'Secondary text',
                    style: { textDecoration: "underline", fontSize: "10px", textAlign: "center", color: "red" }
                },
                {
                    type: 'barCode',
                    value: '023456789010',
                    height: 40,
                    width: 2,
                    displayValue: true,
                    fontsize: 12
                }
            ];
    
            await Promise.all(
                list.map(async (printer) => {
                    try {
                        await print(data, {
                            id: printer.id,
                            name: printer.name,
                            preview: false,
                            page_size: {height:50,width:10},
                            print_setting:{color_type:"monochrome",paper:"A6"}
                         
                        });
                        notify('Message from Rust', `Printed on: ${printer.name}`);
                    } catch (printError) {
                        const errorMessage = printError.message || String(printError);
                        notify('Message from Rust', `Failed to print on: ${printer.name}, Error: ${errorMessage}`);
                        console.error(`Failed to print on: ${printer.name}`, errorMessage);
                    }
                })
            );
    
        } catch (error) {
            const errorMessage = error.message || String(error);
            notify('Message from Rust', `Failed to get printers: ${errorMessage}`);
            console.error("Failed to connect to the printer", errorMessage);
        }
    }


    // <> is an alias for <React.Fragment>
    return !loading && <>
        <Text>{t('Modern Desktop App Examples')}</Text>
        <Space h='lg' />
        <Button onClick={createFile}>Do something with fs</Button>
        <Space />
        {/* <Button onClick={printViaNative(escPosCommand)}>Toggle Fullscreen</Button>
        <Space /> */}

        <Button onClick={connectToPrinter}>Blutooth Printer</Button>
        <Space />

        <Button onClick={() => notifications.show({ title: 'Mantine Notification', message: 'test v6 breaking change' })}>Notification example</Button>

        <Title order={4}>{t('Interpolating components in translations')} </Title>
        <Trans i18nKey='transExample'

            // optional stuff:
            default='FALLBACK if key does not exist. This template is located on <0>github.com{{variable}}</0>' t={t} />
        <TextInput label={t('Persistent data')} value={exampleData} onChange={e => setExampleData(e.currentTarget.value)} />
    </>
}
