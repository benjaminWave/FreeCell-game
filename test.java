import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;
import java.util.Stack;

public class test {

    public static void getX(HashMap<Integer, ArrayList<Integer>> xMap, int[][] points) {
        for (int[] point : points) {
            if (!xMap.containsKey(point[0])) {
                xMap.put(point[0], new ArrayList<>());
            }
            xMap.get(point[0]).add(point[1]);
        }
    }
    public static void getY(HashMap<Integer, ArrayList<Integer>> yMap, int[][] points) {
        for (int[] point : points) {
            if (!yMap.containsKey(point[1])) {
                yMap.put(point[1], new ArrayList<>());
            }
            yMap.get(point[1]).add(point[0]);
        }
    }

    public static int minAreaRect(int[][] points) {
        int area = 0;
        HashMap<Integer, ArrayList<Integer>> xMap = new HashMap<>();
        HashMap<Integer, ArrayList<Integer>> yMap = new HashMap<>();
        getX(xMap, points);
        getY(yMap, points);
        // xMap.put(1,new int[]{1,2});
        return 0;
    }

    public static void main(String[] args) {
        int[][] arr = { { 1, 1 }, { 1, 3 }, { 3, 1 }, { 3, 3 }, { 2, 2 } };
        String input = "2+1*5-4/3";
        System.out.println(minAreaRect(arr));

    }
}
