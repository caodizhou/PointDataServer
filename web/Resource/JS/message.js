/**
 * Created by lijie on 17/11/15.
 */
//------------------------------------------------------------------------------
//                Notification Without sound
var messageboxes = {
    setMessage: function (type,msg,title) {
        Lobibox.notify(type, {
            sound: false,
            msg: msg,
            title: title
        });
    }
}