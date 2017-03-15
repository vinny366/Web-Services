package org.vineel.learn.Messenger.service;

import java.util.ArrayList;
import java.util.Map;

import org.vineel.learn.Messenger.Model.Message;
import org.vineel.learn.Messenger.Model.Profile;
import org.vineel.learn.Messenger.database.Database;

/**
 * 
 * @author Vinny366 
 * 	Returns a List of Messages [ Basically connects to DB ] kani
 *   ikkada anta bomma lekunda oorike chestunnam
 */
public class MessageService {
	private Map<Long,Message> allmsgs = Database.getMessageDb();
	private Map<Long,Profile> allprofiles = Database.getProfileDb();
	
	 public Message addMessage(Message m1){
		 allmsgs.put(m1.getId(), m1);
		 return m1;
	 }

	public ArrayList<Message> getAllMessages() {
		return new ArrayList<Message> (allmsgs.values());
	}
	
	public Message getMsg(long id) {
		return allmsgs.get(id);
	}
	
	public Message updateMessage(Message msg){
		if(msg.getId() == 0){
			return null;
		}else{
			allmsgs.put(msg.getId(), msg);
		}
		return msg;
	}
	public Message removemsg(long id){
		System.out.println("in removemsg fn");
		System.out.println(allmsgs.size());
		 Message del = allmsgs.remove(id);
		 System.out.println(allmsgs.size());
		 return del;
		
		
	}
}
