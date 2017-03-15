package org.vineel.learn.Messenger.database;

import java.util.HashMap;
import java.util.Map;

import org.vineel.learn.Messenger.Model.Message;
import org.vineel.learn.Messenger.Model.Profile;

public class Database {
	
	private static Map<Long, Message> messageDb = new HashMap<Long, Message>();
	private static Map<Long, Profile> profileDb = new HashMap<Long, Profile>();
	static{
		messageDb.put(1L, new Message(1,"msg1","vin1"));
		messageDb.put(2L, new Message(2,"msg2","vin2"));
		messageDb.put(3L, new Message(3,"msg3","vin3"));
	}
	public static Map<Long, Message> getMessageDb() {
		return messageDb;
	}

	public static Map<Long, Profile> getProfileDb() {
		return profileDb;
	}

}
