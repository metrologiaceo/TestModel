var config = {
    host: 'seefl5fgjk7fchv.us.qlikcloud.com',
    prefix: '/',
    port: 443,
    isSecure: true,
    webIntegrationId: 'Rl6R9uncsZ6ZIPbsD_MEEcc_oQzAxwiv'
};

//Redirect to login if user is not logged in
async function login() {
    function isLoggedIn() {
        return fetch("https://"+config.host+"/api/v1/users/me", {
            method: 'GET',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'qlik-web-integration-id': config.webIntegrationId,
            },
        }).then(response => {
            return response.status === 200;
        });
    }
    return isLoggedIn().then(loggedIn =>{
        if (!loggedIn) {
            window.location.href = "https://"+config.host+"/login?qlik-web-integration-id=" + config.webIntegrationId + "&returnto=" + location.href;
            throw new Error('not logged in');
        }
    });
}
login().then(() => {
    require.config( {
        baseUrl: ( config.isSecure ? "https://" : "http://" ) + config.host + (config.port ? ":" + config.port : "") + config.prefix + "resources",
        webIntegrationId: config.webIntegrationId
    } );
    //Load js/qlik after authentication is successful
    require( ["js/qlik"], function ( qlik ) {
        qlik.on( "error", function ( error ) {
            $( '#popupText' ).append( error.message + "<br>" );
            $( '#popup' ).fadeIn( 1000 );
        } );
        $( "#closePopup" ).click( function () {
            $( '#popup' ).hide();
        } );
        //Connection With App of Qlik Cloud
        var app = qlik.openApp( '956f26c7-ef70-41b1-85b0-22491717ba60', config );
       
        //Load of ID objet App Qlik Cloud
        app.visualization.get('8c98dd8c-ef7c-4d83-815c-5d6d66cc38c8').then(function(vis){
        vis.show("QV01");
        } );
        //KPI 1
        app.visualization.get('GBLJKtx').then(function(vis){
        vis.show("QV02");
        } );
        //KPI 2
        app.visualization.get('ZCLQBPG').then(function(vis){
        vis.show("QV03");
        } );
        //Gráfico 1
        app.visualization.get('zBcmzpG').then(function(vis){
        vis.show("QV04");
        } );
        //KPI 3
        app.visualization.get('MYmhma').then(function(vis){
        vis.show("QV05");
        } );
        //Gráfico 2
        app.visualization.get('FpTyJdu').then(function(vis){
        vis.show("QV06");
        } );
        //KPI 4
        app.visualization.get('gThLYJ').then(function(vis){
        vis.show("QV07");
        } );
        //Gráfico 3
        app.visualization.get('CZJfTTS').then(function(vis){
        vis.show("QV08");
        } );
        //KPI 5
        app.visualization.get('DvkaxfW').then(function(vis){
        vis.show("QV09");
        } );
        //Gráfico 4
        app.visualization.get('PdPucF').then(function(vis){
        vis.show("QV10");
        } );
        
    } );
});
