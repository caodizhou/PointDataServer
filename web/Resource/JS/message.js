/**
 * Created by lijie on 17/11/15.
 */
//------------------------------------------------------------------------------
//                Notification Without sound
var messageboxes = {
    setMessage: function (status,msg) {
        Lobibox.notify(status, {
            sound: false,
            msg: msg
        });
    }
}