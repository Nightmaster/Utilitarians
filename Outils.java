package fr.esgi.util;

import java.awt.Color;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.UUID;
import javax.swing.ButtonGroup;
import javax.swing.JOptionPane;
import javax.swing.JRadioButton;

/**
 * @author Gaël BLAISE
 *
 * Classe d'utilitaires type : outils de contrôle, fermeture de programme, etc.
 **/
public class Outils
{

	/**
	* @see http://stackoverflow.com/questions/772802/storing-uuid-as-base64-string
	**/
	public static byte[] uuidAsByteArray(UUID uuid)
	{

		long msb = uuid.getMostSignificantBits();
		long lsb = uuid.getLeastSignificantBits();
		byte[] buffer = new byte[16];

		for (int i = 0; i < 8; i++ )
		{
			buffer[i] = (byte) (msb >>> 8 * (7 - i));
		}
		for (int i = 8; i < 16; i++ )
		{
			buffer[i] = (byte) (lsb >>> 8 * (7 - i));
		}

		return buffer;

	}

	/**
	 * Fonction qui permet de quitter l'application complète, avec ou sans vérification auprès de l'utilisateur
	 *
	 * @param confirm {boolean} : <code>true</code> pour avoir une confirmation utilisateur, <code>false</code> sinon
	 **/
	public static void breakPgm(boolean confirm)
	{
		int quit;
		if (confirm == true) // Quitter avec confirmation
			quit = JOptionPane.showConfirmDialog(null, "Voulez-vous vraiment quitter ?", "Quitter", JOptionPane.YES_NO_OPTION);
		else
			quit = 0; // Quitter sans confirmation
		if (quit == 0)
			System.exit(0);
	}

	/**
	 * Copie un flux entrant dans un flux sortant en tenant compte d'un caractère de fin de séquence
	 *
	 * @param in {InputStream} : Le flux entrant à copier
	 * @param out {OutputStream} : Le flux sortant où la copie doit être effectuée
	 * @param end {String} : Le caractère de fin de séquence
	 * @throws IOException En cas d'utilisation sur un flux (entrant ou sortant) déjà fermé
	 **/
	public static void copyStream(InputStream in, OutputStream out, String end) throws Exception, IOException
	{
		if (!estDefinit(end))
			throw new Exception("End string can not be null or empty");
		int i = -1, pos = 0;
		while (-1 != (i = in.read()))
		{
			out.write(i);
			pos = i == end.charAt(pos) ? pos + 1 : 0;
			if (pos == end.length())
				break;
		}
	}

	/**
	 * Teste si un objet est définit.
	 * @param obj {Object} : l'objet à tester.
	 * @return {boolean} : renvoie <code>false</code> si l'objet est <code>null</code>. Dans le cas d'une string vide renvoie <code>false</code>.<br>Sinon renvoie <code>true</code>.
	 **/
	public static boolean estDefinit(Object obj)
	{
		if (null == obj)
			return false;
		else if (true == obj.equals(""))
			return false;
		else
			return true;
	}

	/**
	 * Teste si un nombre est (strictement) positif ou non
	 * @param chiffre {double} : le double à vérifier.
	 * @param strict {boolean} : indique si on veut vérifier ou non la nullité du nombre.
	 * @return {boolean} : renvoie <code>false</code> si le nombre est négatif, <code>true</code> si il est positif. En cas d'égalité avec 0 : renvoie <code>true</code> si strict est vrai, <code>false</code> sinon.
	 **/
	public static boolean estPositif(double nombre, boolean strict)
	{
		if (true == strict && nombre == 0)
			return true;
		else if (nombre > 0)
			return true;
		else
			return false;
	}

	/**
	 * Teste si un nombre est (strictement) positif ou non
	 * @param chiffre {double} : le float à vérifier.
	 * @param strict {boolean} : indique si on veut vérifier ou non la nullité du nombre.
	 * @return {boolean} : renvoie <code>false</code> si le nombre est négatif, <code>true</code> si il est positif. En cas d'égalité avec 0 : renvoie <code>true</code> si strict est vrai, <code>false</code> sinon.
	 **/
	public static boolean estPositif(float nombre, boolean strict)
	{
		if (true == strict && nombre == 0)
			return true;
		else if (nombre > 0)
			return true;
		else
			return false;
	}

	/**
	 * Teste si un nombre est (strictement) positif ou non
	 * @param nombre {int} : l'int à vérifier.
	 * @param strict {boolean} : indique si on veut vérifier ou non la nullité du nombre.
	 * @return {boolean} <code>false</code> si le nombre est négatif, <code>true</code> si il est positif. Si <code>nombre</code> == 0 : renvoie <code>true</code> si strict est vrai, <code>false</code> sinon.
	 **/
	public static boolean estPositif(int nombre, boolean strict)
	{
		if (true == strict && nombre == 0)
			return true;
		else if (nombre > 0)
			return true;
		else
			return false;
	}

	/**
	 * Teste si un nombre est (strictement) positif ou non
	 * @param chiffre {long} : le long à vérifier.
	 * @param strict {boolean} : indique si on veut vérifier ou non la nullité du nombre.
	 * @return {boolean} : renvoie <code>false</code> si le nombre est négatif, <code>true</code> si il est positif. En cas d'égalité avec 0 : renvoie <code>true</code> si strict est vrai, <code>false</code> sinon.
	 **/
	public static boolean estPositif(long nombre, boolean strict)
	{
		if (true == strict && nombre == 0)
			return true;
		else if (nombre > 0)
			return true;
		else
			return false;
	}

	/**
	 * Teste si un nombre est (strictement) positif ou non
	 * @param chiffre {short} : le short à vérifier.
	 * @param strict {boolean} : indique si on veut vérifier ou non la nullité du nombre.
	 * @return {boolean} : renvoie <code>false</code> si le nombre est négatif, <code>true</code> si il est positif. En cas d'égalité avec 0 : renvoie <code>true</code> si strict est vrai, <code>false</code> sinon.
	 **/
	public static boolean estPositif(short nombre, boolean strict)
	{
		if (true == strict && nombre == 0)
			return true;
		else if (nombre > 0)
			return true;
		else
			return false;
	}

	/**
	 * Fonction permettant d'obtenir un tableau de couleur à équidistance dans la panel TLS de la lumière, avec une saturation et une luminosité à 100%
	 *
	 * @param nbElem {int} : nombre de couleur différentes voulues
	 * @return {Color []} Un tableau contenant <code><b>nbElem</b></code> couleurs différentes
	 **/
	public static Color[] rainbow(int nbElem)
	{
		Color[] res = new Color[nbElem];
		float teinte, saturation = 1, luminosité = 1;
		for (int i = 0; i < nbElem; i++ )
		{
			teinte = (float) i / (float) nbElem;
			res[i] = Color.getHSBColor(teinte, saturation, luminosité);
		}
		return res;
	}

	/**
	 * Fonction permettant d'obtenir un tableau de couleur à équidistance dans la panel TLS de la lumière
	 *
	 * @param nbElem {int} : nombre de couleur différentes voulues
	 * @param saturation {float} : Nombre compris entre 0 & 1 indiquant le taux saturation des couleurs
	 * @param luminosite {float} : Nombre compris entre 0 & 1 indiquant la luminosité des couleurs
	 * @return {Color []} Un tableau contenant <code><b>nbElem</b></code> couleurs différentes
	 **/
	public static Color[] rainbow(int nbElem, float saturation, float luminosite)
	{
		Color[] res = new Color[nbElem];
		float teinte;
		for (int i = 0; i < nbElem; i++ )
		{
			teinte = (float) i / (float) nbElem;
			res[i] = Color.getHSBColor(teinte, saturation, luminosite);
		}
		return res;
	}

	public static ButtonGroup regroupeBoutons(JRadioButton[] tab)
	{
		ButtonGroup grpBtn = new ButtonGroup();
		for (JRadioButton btn : tab)
			grpBtn.add(btn);
		return grpBtn;
	}

	public static UUID toUUID(byte[] byteArray)
	{

		long msb = 0;
		long lsb = 0;
		for (int i = 0; i < 8; i++ )
			msb = (msb << 8) | (byteArray[i] & 0xff);
		for (int i = 8; i < 16; i++ )
			lsb = (lsb << 8) | (byteArray[i] & 0xff);
		UUID result = new UUID(msb, lsb);

		return result;
	}
}