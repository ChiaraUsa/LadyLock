package com.example.app.notification;

public class Message {

    private String text;
    private String to;
    private double latitude;
    private double longitude;

    public String getText() {
        return text;
    }

    public String getTo() {
        return to;
    }

    public double getLatitude() {
        return latitude;
    }

    public double getLongitude() {
        return longitude;
    }

    public void setTo(String to) {
        this.to = to;
    }

    public void setText(String text) {
        this.text = text;
    }

    public void setLatitude(double latitude) {
        this.latitude = latitude;
    }

    public void setLongitude(double longitude) {
        this.longitude = longitude;
    }
}
