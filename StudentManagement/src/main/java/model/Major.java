package model;

import java.io.Serializable;

public class Major implements Serializable {

    private static final long serialVersionUID = 1L;

    private String Mno; // 专业编号
    private String Mname; // 专业名

    public String getMno() {
        return Mno;
    }

    public void setMno(String mno) {
        Mno = mno;
    }

    public String getMname() {
        return Mname;
    }

    public void setMname(String mname) {
        Mname = mname;
    }

}