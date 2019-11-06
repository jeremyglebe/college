/**
 * Write a default constructor that will assign the value 1 to both parts.
 * 
 * Write a constructor that will allow the user to assign values to both parts
 * at declaration.
 * 
 * Write a mutator method that will set the value of the real part.
 * 
 * Write an accessor method that will return the value of the imag part.
 * 
 * Write an add method that will add two complex numbers (the real parts are
 * added to form the real part of the result and the imag parts are added to
 * form the imag part of the result).
 */

public class Complex {
    private int real;
    private int imag;

    public Complex() {
        this.real = 1;
        this.imag = 1;
    }

    public Complex(int real, int imag) {
        this.real = real;
        this.imag = imag;
    }

    public void setReal(int real) {
        this.real = real;
    }

    public int getImag() {
        return imag;
    }

    public int getReal() {
        return real;
    }

    public Complex add(Complex other) {
        return new Complex(this.real + other.real, this.imag + other.imag);
    }
}