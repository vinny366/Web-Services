package org.vineel.learn.Messenger.resources;

import java.util.ArrayList;

import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.vineel.learn.Messenger.Model.Message;
import org.vineel.learn.Messenger.service.MessageService;

@Path("/messages")
public class MessageResource {
	MessageService ms = new MessageService();

	@GET
	@Produces(MediaType.APPLICATION_XML)
	public ArrayList<Message> getMessages() {
		return ms.getAllMessages();  // ela telustadi aa message ni xml loki etla marchalo?? 
		// use jaxB --> daniki XmlRootElement ivvali.. adi deniki ivvali?? Message ki.. adi root kabatti
	}
	
	 @GET
	 @Path("/{messageId}")
	 @Produces(MediaType.APPLICATION_XML)
	 public Message getSingleMessage(@PathParam("messageId") long mId){
		 return ms.getMsg(mId);
	 }

	 @DELETE
	 @Path("/{messageId}")
	 @Produces(MediaType.APPLICATION_XML)
	 public void deleteMessage(@PathParam("messageId") long mId){
		 System.out.println("in deklete " + mId);
		  ms.removemsg(mId);
	 }
}
