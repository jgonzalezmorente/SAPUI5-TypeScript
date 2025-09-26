
import MessageBox from 'sap/m/MessageBox';
import mockserver from '../localService/mockserver';

async function startAppWithMocks() {    
    try {
        const mockServers = [
            mockserver.init(),
        ];
        await Promise.all(mockServers);
    } catch (error: any) {
        MessageBox.error(error.message);        
    } finally {
        sap.ui.require(['sap/ui/core/ComponentSupport'])
    }
}

startAppWithMocks();