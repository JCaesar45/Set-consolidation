import java.util.*;

public class SetConsolidation {
    static class Group {
        Set<Character> chars;
        List<Integer> indices;
        Group(String s, int idx) {
            chars = new HashSet<>();
            for (char c : s.toCharArray()) chars.add(c);
            indices = new ArrayList<>(List.of(idx));
        }
    }

    public static List<List<Character>> consolidate(String[] sets) {
        List<Group> groups = new ArrayList<>();
        for (int i = 0; i < sets.length; i++) groups.add(new Group(sets[i], i));

        boolean merged = true;
        while (merged) {
            merged = false;
            outer:
            for (int i = 0; i < groups.size(); i++) {
                for (int j = i + 1; j < groups.size(); j++) {
                    Set<Character> inter = new HashSet<>(groups.get(i).chars);
                    inter.retainAll(groups.get(j).chars);
                    if (!inter.isEmpty()) {
                        groups.get(i).chars.addAll(groups.get(j).chars);
                        groups.get(i).indices.addAll(groups.get(j).indices);
                        groups.remove(j);
                        merged = true;
                        break outer;
                    }
                }
            }
        }

        groups.sort((a, b) ->
            Collections.max(b.indices) - Collections.max(a.indices));

        List<List<Character>> result = new ArrayList<>();
        for (Group g : groups) {
            List<Character> list = new ArrayList<>(g.chars);
            Collections.sort(list);
            result.add(list);
        }
        return result;
    }

    public static void main(String[] args) {
        System.out.println(consolidate(new String[]{"AB", "CD"}));
        System.out.println(consolidate(new String[]{"AB", "BD"}));
        System.out.println(consolidate(new String[]{"AB", "CD", "DB"}));
        System.out.println(consolidate(new String[]{"HIK", "AB", "CD", "DB", "FGH"}));
    }
}
